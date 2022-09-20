'use strict'

import { bugService } from '../services/bug-service.js'
import { eventBus } from '../services/eventBus-service.js'

export default {
	template: `
    <section v-if="bug" class="bug-details">
        <h1>{{bug.title}}</h1>
        <p v-if="bug.description">Description: {{bug.description}}</p>
        <span :class='"severity" + bug.severity'>Severity: {{bug.severity}}</span>
        <router-link to="/bug">Back</router-link>
    </section>
     <section v-else>
      <div>Slow down!</div>
      <p>(If you want to see more bugs get the premium version)</p>
      <router-link to="/bug">Back</router-link>
    </section> 
    `,
	data() {
		return {
			bug: null,
		}
	},
	created() {
		const { bugId } = this.$route.params
		if (bugId) {
			bugService.getById(bugId)
				.then((bug) => {
					this.bug = bug
				})
				.catch((err) => {
					if (err.response.status === 401) {
						eventBus.emit('show-msg', { txt: 'You have reached your limit for now! try again later', type: 'error' })
						this.$router.push('/bug')
					}
					console.log(err);
				})
		}
	},
}
