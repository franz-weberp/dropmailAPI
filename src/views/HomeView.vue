<template>
	<div class="container inbox">
    <div class="row">
      <div class="col-12 text-center mt-5 mb-3">
        <CTemporaryEmail
          :email="email"
          @copy-to-clipboard="handleCopyToClipboard"
          @generate-new-email="handleDeleteEmail"
          @request-notification-permission="handlePermissionNotification"
					:notificable="notificable"
        />
      </div>

      <div class="col-12 text-center refresh mb-3">
				<div class="row row-cols-4">
					<div class="col col-1 col-lg-4"></div>
					<div class="col col-12 col-lg-2 d-grid px-0 mb-3 mb-lg-0">
						<C-CountdownAutoRefesh :countdown="countdown"/>
					</div>
					<div class="col col-12 col-lg-2 d-grid">
						<C-ButtonRefresh :disabled="loading" @refresh="refreshInboxSession"/>
					</div>
					<div class="col col-1 col-lg-4"></div>
				</div>
      </div>

			<div class="inbox-container">
				<div class="row row-cols-1 row-cols-lg-2">
					<div class="col col-lg-3 p-0">
						<CInbox :mails="sessionData.mails" @select-mail="handleSelectMail" />
					</div>
					<div class="col col-lg-9 email">
						<CEmailView :mail="selectedMail" v-if="selectedMail" />
					</div>
				</div>
			</div>
		
			<CNotificationModal 
				:modalId="'notificationModal'" 
				ref="notificationModal" 
				:headerNotification="headerNotification" 
				:message="notificationMessage"  
				:buttonConfirm="buttonNotification"
				:deleteEmail="deleteEmail" 
				:caseModalNotification="caseModalNotification" 
				@modal-accepted="handleModalAccepted" 
			/>

			<CToast 
				ref="toast" 
				:message="toastMessage" 
				:clipState="clipState" 
			/>
    </div>
  </div>
</template>

<script>
import CNotificationModal from '@components/C-NotificationModal.vue'
import CToast from '@components/C-Toast.vue'
import CTemporaryEmail from '@components/C-TemporaryEmail.vue'
import CCountdownAutoRefesh from '@components/C-CountdownAutoRefesh.vue'
import CButtonRefresh from '@components/C-ButtonRefresh.vue'
import CInbox from '@components/C-Inbox.vue'
import CEmailView from '@components/C-EmailView.vue'
import { createNewEmail, refreshInbox } from '@utils/dropmailAPI/apiService.js';
import { 
	requestNotificationPermission, 
	getStatePermissionNotification, 
	newEmailOnInbox, 
	sessionExpired, 
	emailExpired
} from '@utils/notifications/notifications.js'
import {
	headerNotificationModalPermission, 
	headerNotificationModalDelete, 
	notificationModalPermission, 
	notificationModalDelete, 
	notificationToastCopyToClipBoard, 
	notificationToastRefreshed,
	buttonNotificationModalPermission, 
	buttonNotificationModalDelete 
} from '@utils/messages/messages.js'

export default {
	components: {
		CNotificationModal,
		CToast,
		CTemporaryEmail,
		CCountdownAutoRefesh,
		CButtonRefresh,
		CInbox,
		CEmailView
  },

	data() {
    return {
      email: '',
			sessionId: '',
			expiresAt: '',
			errorSession: false,
			sessionData: {
        mails: [],
      },
			selectedMail: null,
			countdown: 15,
			intervalId: null,
			loading: false,
			nowFormatted: '',
			notificable: false,
			emailInboxLength: 0,
			clipState: true,
			deleteEmail: false,
			caseModalNotification: '',
			headerNotification: '',
			buttonNotification: '',
			notificationMessage: notificationModalPermission,
    	toastMessage: notificationToastCopyToClipBoard
    }
  },

	async mounted() {
		try {
			this.getLocalStorageInfo()

			if (!this.expiresAt || this.checkEmailExpired()) { this.generateNewEmail() }
			
			this.startCountdown()
			this.refreshInboxSession()
			
		} catch (error) {
			console.error(error)
		}
	},

	methods: {
		startCountdown() {
			clearInterval(this.intervalId);

			this.intervalId = setInterval(() => {
				if (this.countdown === 1) {
					this.refreshInboxSession()
					clearInterval(this.intervalId)
				}
				this.countdown--;
			}, 1000);
    },

		restartCountDown() {
			this.countdown = 15
			this.startCountdown()
		},

		async generateNewEmail() {
			this.deleteLocalStorageDataAboutSessionId()
			await this.setEmailInfo()
			await this.refreshInboxSession()
			this.restartCountDown()
		},

		async setEmailInfo() {
			this.getLocalStorageInfo()

			const data = await createNewEmail()
			this.email = data.address
			this.sessionId = data.id
			this.expiresAt = data.expiresAt + 60 * 60 * 1000

			localStorage.setItem('email', this.email)
			localStorage.setItem('sessionId', this.sessionId)
			localStorage.setItem('expiresAt', this.expiresAt)

			return Promise.resolve(this.email);
		},

		async refreshInboxSession() {
			try {
				this.loading = true
				this.defineToastMessage(notificationToastRefreshed)

				if (this.checkEmailExpired() || this.checkSessionExpired()) return await this.generateNewEmail()

				const sessionData = await refreshInbox(this.sessionId)
				this.notificable = getStatePermissionNotification()

				if (Number(localStorage.getItem('emailInboxLength')) !== sessionData.mails.length) {
					localStorage.setItem('emailInboxLength', sessionData.mails.length)

					this.notification(newEmailOnInbox, localStorage.getItem('emailInboxLength'))
				}

				this.sessionData = sessionData
				this.restartCountDown()
			} 
			catch (error) { 
				console.error('Error on refreshInboxSession:', error && error.stack);
				if (error.message === 'session_not_found') { 
					this.errorSession = true
					this.generateNewEmail()
				}
			} 
			finally { this.loading = false }
		},

		checkEmailExpired() {
			const expiresAt = localStorage.getItem('expiresAt')
			const now = new Date()
			const expired = new Date(expiresAt).getTime()

			if (now >= expired || expiresAt === null) {
				this.notification(emailExpired, localStorage.getItem('email'))
				return true
			}

		},

		checkSessionExpired() {
			if (localStorage.getItem('expiresAt') === null || this.errorSession) {
				this.notification(sessionExpired, localStorage.getItem('email'))
				return true
			}
		},

		notification(typeNotification, valueToBodyNotification) {
			if (this.notificable) typeNotification(valueToBodyNotification)
		},

		getLocalStorageInfo() {
			this.sessionId = localStorage.getItem('sessionId')
			this.email = localStorage.getItem('email')
			this.expiresAt = localStorage.getItem('expiresAt')
    	this.emailInboxLength = localStorage.getItem('emailInboxLength')
		},

		deleteLocalStorageDataAboutSessionId() {
			localStorage.removeItem('sessionId')
			localStorage.removeItem('email')
			localStorage.removeItem('expiresAt')
			localStorage.removeItem('emailInboxLength')
		},

		handleSelectMail(mail) { this.selectedMail = mail },

		handleModalAccepted() {
			if (this.caseModalNotification === 'permission') {
				if (getStatePermissionNotification) { requestNotificationPermission() } 
			}

			if (this.caseModalNotification === 'delete') {
				if (this.deleteEmail) { 
					this.generateNewEmail()
					this.deleteEmail = false
				}
			}
		},

		handlePermissionNotification(actionType) {
			this.deleteEmail = false
			this.caseModalNotification = actionType
			this.defineModalMessage(headerNotificationModalPermission, notificationModalPermission, buttonNotificationModalPermission)
		},

		handleDeleteEmail(actionType) {
			this.deleteEmail = true
			this.caseModalNotification = actionType
			this.defineModalMessage(headerNotificationModalDelete, notificationModalDelete, buttonNotificationModalDelete)
		}, 

		defineModalMessage(header, message, button) {
			this.headerNotification = header
			this.notificationMessage = message
			this.buttonNotification = button
			this.showModal()
		},

		showModal() { this.$refs.notificationModal.show() },

		handleCopyToClipboard(clipState, message, copiedEmail) {
			if (!clipState) return
			
			this.clipState = clipState
			this.email = copiedEmail
			
			this.defineToastMessage(notificationToastCopyToClipBoard)
    },

		defineToastMessage(message) { 
			this.toastMessage = message
			this.showToast(message)
		},

		showToast(message) { this.$refs.toast.show(message) }
	}
}
</script>

<style>
.inbox { border: 1px solid grey; }
.email { background-color: #d3d3d3; }
</style>