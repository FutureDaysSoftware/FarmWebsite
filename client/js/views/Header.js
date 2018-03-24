module.exports = Object.create( Object.assign( {}, require('./__proto__'), {

    User: require('../models/User'),

    events: {
        navList: 'click'
    },

    insertion() { return { el: document.querySelector('#content'), method: 'insertBefore' } },

    model: require('../models/Header'),

    name: 'Header',
    onNavListClick(event) {
        this.emit('navigate', `/${ event.target.textContent.split(' ').join('') }`)
        var headers = event.target.parentElement.children
        for (var i = 0; i < headers.length; i ++) {
            headers[i].classList.remove('selected')
        }
        event.target.classList.add('selected')
    },

    onLogoutClick() {
        this.User.logout()
    },

    onUserLogin() {
        this.els.profileBtn.classList.remove('hidden')        
        this.els.name.textContent = this.User.data.name || this.User.data.email
    },

    onUserLogout() {
        this.els.profileBtn.classList.add('hidden')        
        this.els.name.textContent = ''
    },

    postRender() {

        if( this.User.isLoggedIn() ) this.onUserLogin()

        this.User.on( 'got', () => { if( this.User.isLoggedIn() ) this.onUserLogin() } )
        this.User.on( 'logout', () => this.onUserLogout() )

        return this
    },
    
    template: require('./templates/Header')

} ), { } )
