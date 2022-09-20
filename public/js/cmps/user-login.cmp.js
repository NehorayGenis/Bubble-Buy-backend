'use strict'
import { userService } from '../services/user-service.js'
export default {
  template: `<article>
                <h4>LOGIN PAGE</h4>
                <form @submit.prevent="onSubmit">

                    <input @submit="onSubmit" type="text" v-model="userName" placeholder="enter username">
                </form>
              </article>`,
  methods: {
    onSubmit() {
      userService.login(this.userName)
        .then((() => {
          this.$router.push('/bug');
        }))
        .catch(err => console.log(err))
    }
  },
  data() {
    return {
      userName: '',
    }
  },
}
