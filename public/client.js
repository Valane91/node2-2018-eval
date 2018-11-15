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
        var vm = this;
        this.intervalid1 = setInterval(() => {

            LoadTime('/server')
                .then(servers => {
                    console.log(servers)
                        vm.results = servers.data;
                })
                .catch(err => {
                    //alert("Ooops")
                })
                .then(servers => {

                })

        }, 2000);
    },

})
    function LoadTime(url) {
        return fetch(url)
            .then(response => response.json())
    }

});