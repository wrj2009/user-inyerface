let app = new Vue({
  el: '#app',
  data: () => ({
    time: '00:00:00',
    step: 1,
    cookies: false,
    registerStep: 1,
    password: '输入密码',
    email: '您的电子邮箱',
    domainName: '域名',
    domains: ['其他', '.org', '.co.uk', '.net', '.gov', '.de', '.fr', '.nl', '.com', '.be', '.jpg'],
    domain: '其他',
    notAccept: true,
    termsAndConditionsDialog: false,
    termsAndConditionsViewed: false,
    termsAndConditionsProgress: 0,
    termsAndConditionsDialogAltPressed: false,
    termsAndConditionsDialogFullscreen: false,
    cancelDialog: false,
    cancelDialogFullscreen: false,
    helpDialogHeight: 0,
    helpContent: '',
    waitingPeople: 400 + Math.floor(Math.random() * 100),
    showWaitingPeople: false,
    helpStyle: '',
    passwordValid: true,
    emailValid: true,
    domainNameValid: true,
    domainValid: true,
    passwordNotUnsafe: undefined,
    notAcceptWarning: false,
    timeWarningDialog: false,
    timeWarningDialogFullscreen: false,
    timeWarningDialogLocked: false,
    currentYear: new Date().getFullYear(),
  }),
  methods: {
    passwordOnBlur () {
      if (this.password === '') {
        this.password = '输入密码'
      }
    },
    emailOnBlur () {
      if (this.email === '') {
        this.email = '您的电子邮箱'
      }
    },
    domainOnBlur () {
      if (this.domain === '') {
        this.domain = '域名'
      }
    },
    closeTermsAndConditionsDialog () {
      if (this.termsAndConditionsViewed) {
        this.termsAndConditionsDialog = false
        this.termsAndConditionsViewed = false
        this.termsAndConditionsProgress = 0
      }
    },
    termsAndConditionsDialogOnWheel(e) {
      if (e.deltaY > 0) {
        if (this.termsAndConditionsDialogAltPressed) {
          this.termsAndConditionsProgress += 0.25
        } else {
          this.termsAndConditionsProgress += 0.002
        }
      } else {
        if (this.termsAndConditionsDialogAltPressed) {
          this.termsAndConditionsProgress -= 0.25
        } else {
          this.termsAndConditionsProgress -= 0.002
        }
      }
      if (this.termsAndConditionsProgress > 1) {
        this.termsAndConditionsProgress = 1
      }
      if (this.termsAndConditionsProgress < 0) {
        this.termsAndConditionsProgress = 0
      }
      if (this.termsAndConditionsProgress === 1) {
        this.termsAndConditionsViewed = true
      }
    },
    reset () {
      this.password = '输入密码'
      this.email = '您的电子邮箱'
      this.domain = '其他'
      this.domainName = '域名'
      this.notAccept = true
    },
    cancelRegistration () {
      window.location.href = './index.html'
    },
    helpContentOnInput () {
      let characters = ['啊', '嗯', '唔', '呃', '？', '！', '。', '，', '、']
      this.helpContent = [...this.helpContent].join(characters[Math.floor(Math.random() * characters.length)])
    },
    sendToBottom () {
      this.helpContent = ''
      this.showWaitingPeople = false
      let moveID = setInterval(() => {
        this.helpDialogHeight -= (256 - 10) / (12000 / 10)
        this.helpStyle = `bottom: ${this.helpDialogHeight}px;`
      }, 10)
      setTimeout(() => {
        clearInterval(moveID)
      }, 12000)
    },
    up () {
      let moveID = setInterval(() => {
        this.helpDialogHeight += 50 / (200 / 10)
        this.helpStyle = `min-height: ${220 + this.helpDialogHeight}px; bottom: 0;`
      }, 10)
      setTimeout(() => {
        clearInterval(moveID)
      }, 200)
    },
    validateForm1 () {
      this.passwordValid = true
      this.emailValid = true
      this.domainNameValid = true
      this.domainValid = true
      this.passwordNotUnsafe = false
      this.notAcceptWarning = false
      if (this.password === '输入密码') {
        this.passwordValid = false
      } else if (this.password.length < 10) {
        this.passwordValid = false
      } else if (this.password.toLowerCase() === this.password) {
        this.passwordValid = false
      } else if (this.password.match(/\d/).length === 0) {
        this.passwordValid = false
      } else {
        let containsCharacterInEmail = false
        for (let i = 0; i < this.email.length; i++) {
          if (this.password.indexOf(this.email[i]) !== -1) {
            containsCharacterInEmail = true
            break
          }
        }
        if (containsCharacterInEmail) {
          this.passwordNotUnsafe = true
        } else {
          this.passwordValid = false
        }
      }
      if (this.email === '您的电子邮箱') {
        this.emailValid = false
      }
      if (this.domain === '其他') {
        this.domainValid = false
      }
      if (this.domainName === '域名') {
        this.domainNameValid = false
      }
      if (this.notAccept === true) {
        this.notAcceptWarning = true
      }
      if (this.passwordValid && this.emailValid && this.domainNameValid && this.domainValid && !this.notAcceptWarning) {
        this.registerStep = 2
      }
    },
    passwordInputValidate () {
      if (this.passwordNotUnsafe !== undefined) {
        this.passwordValid = true
        this.passwordNotUnsafe = false
        if (this.password === '输入密码') {
          this.passwordValid = false
        } else if (this.password.length < 10) {
          this.passwordValid = false
        } else if (this.password.toLowerCase() === this.password) {
          this.passwordValid = false
        } else if (this.password.match(/\d/).length === 0) {
          this.passwordValid = false
        } else {
          let containsCharacterInEmail = false
          for (let i = 0; i < this.email.length; i++) {
            if (this.password.indexOf(this.email[i]) !== -1) {
              containsCharacterInEmail = true
              break
            }
          }
          if (containsCharacterInEmail) {
            this.passwordNotUnsafe = true
          } else {
            this.passwordValid = false
          }
        }
      }
    }
  }
})
const startTime = new Date().getTime()
setInterval(() => {
  app.step = app.step % 4 + 1
  let timer = new Date(new Date().getTime() - startTime)
  let hours = Math.floor(timer / (1000 * 60 * 60) % 24)
  let minutes = Math.floor(timer / (1000 * 60) % 60)
  let seconds = Math.floor(timer / 1000 % 60)
  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  app.time = hours + ':' + minutes + ':' + seconds
  if (seconds === '00') {
    app.timeWarningDialog = true
  }
}, 1000)
setTimeout(() => {
  app.cookies = true
}, 2000)
document.body.addEventListener(
  "keydown",
  (e) => {
    if (e.key === 'Alt') {
      app.termsAndConditionsDialogAltPressed = true
    }
  }
)
document.body.addEventListener(
  "keyup",
  (e) => {
    if (e.key === 'Alt') {
      app.termsAndConditionsDialogAltPressed = false
    }
  }
)
