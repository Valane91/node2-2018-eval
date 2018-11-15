$( document ).ready(function(){
const vm = new Vue({
    el: '#server-vue',
    data: {
      selectedTime: 'test',
        servers: ['localhost:4000','localhost:4001','localhost:4002'],
        results:[]
    },
    computed: {

      },
    methods: {
      loadServers :function () {

      }
      
    },
    created: function() {
        this.intervalid1 = setInterval(() => {
           console.log("rprpr")
        }, 3000);
    },

})
    function LoadTime(url) {
        return fetch(url)
            .then(response => response.json())
    }

});