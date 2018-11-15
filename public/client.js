{
  const formatTime = date =>
    moment(date).local().format('hh:mm:ss')


  const vm = new Vue({
    el: '#time',
    data: {
      //selectedTime: '',
    },
    computed: {
      selectedTime: function() {
          return this.getTime()
        },
      },
    methods: {
      getTime: function() {
        return formatTime(new Date())
      },

    },
  })
}
