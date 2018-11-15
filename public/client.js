$( document ).ready(function(){
const vm = new Vue({
    el: '#server-vue',
    data: {
      selectedTime: 'test',
        servers: ['localhost:4000','localhost:4001','localhost:4002'],
        results:[],
        DateNow: new Date(),
        message:''
    },
    computed: {

      },
    methods: {
        addNewTodo: function () {
            console.log(this.message)
            var data = {secret:this.message}
            console.log("sfsd")
            changeSecret(data,'http://localhost:4001/secret','PUT')
        }
      
    },
    created: function() {
        var vm = this;
        this.intervalid1 = setInterval(() => {
            console.log(vm.DateNow)
            /*var hms = '02:04:33';   // your input string
            var a = hms.split(':'); // split it at the colons
            var seconds = (+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]);*/


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

    function changeSecret(item,url,type) {
        return fetch(url, {
            method: type,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(item),
        })
            .then(response => response.json())
    }
});