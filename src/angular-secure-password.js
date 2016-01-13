angular.module('angular-secure-password', []).directive('securePassword',
  function(){
    return {  
      restrict: 'E',
      replace: false,
      transclude: false,
      scope: {
        // buff: '=arraybuffer',  // I have no idea what I'm doing
        // loggedin: '=',
        // oeprvkey: '=' // both set after successful login
      },

      template: '<div style="margin-bottom: 10px;">'+
                  '<span class="secureAM" ng-keypress="append($event)" ng-keydown="limitedAlter($event)" tabindex="-1">'+
                    '<span ng-repeat="char in notPassword">'+
                      '<span ng-if="$first" style="word-spacing: -10px;">&nbsp;</span>'+
                      '<span class="password-symbol">&bull;&nbsp;</span>'+
                    '</span>'+
                    '<span class="blinking-cursor">|&nbsp;</span>'+
                    '<span class="placeholder" ng-if="notPassword.length===0">Password</span>'+
                  '</span>'+
                '</div>',
      link: function(scope, element, attrs) {
        // scope.data = {
        //     key: false, // flag if file with key is uploaded
        //     keypair: {} // keypair
        // };
      },

      controller: ['$scope',
        function($scope) {
          var cursor = 0;
          $scope.buff = new Uint8Array(100);
          $scope.decoder = new TextDecoder('utf-8');
          $scope.notPassword = [];

          $scope.clearAll = function() {
            cursor = 0;
            $scope.buff.fill(0);
            $scope.notPassword = [];
          };

          $scope.append = function(keyEvent) {
            // console.log(keyEvent);
            /// only ascii printable characters allowed (currently)
            if(keyEvent.charCode >= 32 && keyEvent.charCode <= 126) {
              if (cursor >= 0 && cursor < 99) {
                $scope.buff[cursor] = keyEvent.charCode;
                $scope.notPassword.push(cursor);
                cursor++;
              }
            }
            stopEvent(keyEvent);
          };
          
          
          $scope.limitedAlter = function(keyEvent){
            // console.log(keyEvent);
            if(keyEvent.keyCode !== 8) //&& keyEvent.keyIdentifier === 'U+0008')
              return;
            else {
              if (cursor > 0) {
                $scope.buff[--cursor] = 0;
                $scope.notPassword.splice(-1, 1);
              }
              stopEvent(keyEvent);
            }
          };
          
          var stopEvent = function(e) { if (e) { e.preventDefault(); if (e.stopPropagation) {e.stopPropagation(); } else {e.cancelBubble = true; } } };
        }
      ]
    };
  });