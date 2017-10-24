var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope, $interval) {
  $scope.CountDown = {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    getTimeRemaining: function(endtime) {
      var t = Date.parse(endtime) - Date.parse(new Date());
      var seconds = Math.floor((t / 1000) % 60);
      var minutes = Math.floor((t / 1000 / 60) % 60);
      var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
      var days = Math.floor(t / (1000 * 60 * 60 * 24));
      return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
      };
    },

    initializeClock: function(endtime) {
      function updateClock() {
        var t = $scope.CountDown.getTimeRemaining(endtime);

        $scope.CountDown.days = t.days; //t.days < 10 ? '0' + t.days : t.days;
        $scope.CountDown.hours = ('0' + t.hours).slice(-2);
        $scope.CountDown.minutes = ('0' + t.minutes).slice(-2);
        $scope.CountDown.seconds = ('0' + t.seconds).slice(-2);

        //if (t.total <= 0) {
        //  $interval.cancel(timeinterval);
        //}
      }

      updateClock();
      var timeinterval = $interval(updateClock, 1000);
    }
  }

  var query = parseQuery(location.search);
  var deadline = new Date(Date.parse(new Date()) + 2 * 12 * 60 * 60 * 1000);
  if (query.to) {
    deadline = new Date(query.to);
  }
  $scope.CountDown.initializeClock(deadline);
});

function parseQuery(queryString) {
    var query = {};
    var pairs = (queryString[0] === '?' ? queryString.substr(1) : queryString).split('&');
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split('=');
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || '');
    }
    return query;
}
