'use strict'
import { bugService } from '../services/bug-service.js'
import bugList from '../cmps/bug-list.cmp.js'
import bugFilter from '../cmps/bug-filter.cmp.js'
import { userService } from '../services/user-service.js'
import { eventBus } from '../services/eventBus-service.js'
import userLogin from '../cmps/user-login.cmp.js'
export default {
  template: `
    <section class="bug-app">
      <user-login v-if="!user"/>
      <button v-else @click="onLogout">Logout</button>
        <div class="subheader">
          <bug-filter @setFilterBy="setFilterBy"></bug-filter> ||
          <router-link to="/bug/edit">Add New Bug</router-link> 
        </div>
        <bug-list v-if="bugs" :bugs="bugs" @removeBug="removeBug"></bug-list>
		<button @click="onSetPage(-1)">Prev</button>
        <button @click="onSetPage(1)">Next</button>
    </section>
    `,
  data() {
    return {
      bugs: [],
      filterBy: { page: 0, txt: '' },
      user: null
    }
  },
  created() {
    this.loadBugs()
    this.user = userService.getLoggedInUser()
  },
  methods: {
    loadBugs(filterBy) {
      // console.log("bug-app", this.filterBy)
      bugService.query(this.filterBy).then((bugs) => {
        this.bugs = bugs
      })
    },
    setFilterBy(filterBy) {
      this.filterBy = filterBy
      this.loadBugs(this.filterBy)
    },
    removeBug(bugId) {
      bugService
        .remove(bugId)
        .then((res) => this.loadBugs())
        .catch(() => {
          eventBus.emit('show-msg', {
            txt: 'Cant delete Others bugs',
            type: 'error',
          })
        })
    },
    onLogout() {
      userService.logout().then(() => {
        this.$router.push('/login')
      })
    },
    onSetPage(dir) {
      this.filterBy.page += dir
      bugService.getBugsData().then(({ totalPages }) => {
        if (this.filterBy.page > totalPages) this.filterBy.page = 0
        else if (this.filterBy.page < 0) {
          this.filterBy.page = totalPages
        }
        this.loadBugs()
      })
    },
  },
  computed: {
    // bugsToDisplay() {
    // 	if (!this.filterBy?.title) return this.bugs
    // 	return this.bugs.filter((bug) => bug.title.includes(this.filterBy.title))
    // },
  },
  components: {
    bugList,
    bugFilter,
    userLogin
  },
}
