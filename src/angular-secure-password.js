angular.module('angular-secure-password', []).directive('securePassword',
  function(){
    return {  
      restrict: 'E',
      replace: false,
      transclude: false,
      scope: { buffer: '=typedarray', extended: '=?' },

      template: '<div style="margin-bottom: 10px;">'+
                  '<span class="secure-input" ng-keypress="append($event)" ng-keydown="alter($event)" tabindex="0">'+
                    '<span ng-repeat="char in notPassword">'+
                      '<span ng-if="$first" class="first-symbol">&nbsp;</span>'+
                      '<span class="password-symbol">&bull;&nbsp;</span>'+
                    '</span>'+
                    '<span class="blinking-cursor">|&nbsp;</span>'+
                    '<span class="placeholder" ng-if="notPassword.length===0">Password</span>'+
                  '</span>'+
                '</div>',
                
      link: {
        pre: function prelink(scope, element, attrs){
          var cursor = 0;
          var size = scope.buffer.length;
          scope.notPassword = [];
          
          // // not sure how to expose directive function to parent controller
          // scope.clear = function() {
          //   cursor = 0;
          //   scope.buffer.fill(0);
          //   scope.notPassword = [];
          // };
          
          scope.alter = function(keyEvent){
            // console.log(keyEvent);
            if (keyEvent.keyCode === 8 && cursor > 0) { // || keyEvent.keyIdentifier === 'U+0008')
              scope.buffer[--cursor] = 0;
              scope.notPassword.splice(-1, 1);
            }
            if (keyEvent.keyCode === 8 && cursor >= 0)
              stopEvent(keyEvent); // to prevent backspace from navigating backwards in browser history
          };
          
          //// NOTE: Functionality of extended ASCII has not been tested whatsoever
          scope.append = function(keyEvent) {
            // console.log(keyEvent);
            var cC = keyEvent.charCode;
            // console.log(cC);
            var cond1 = cC >= 32 && cC <= 126,  //excludes 'DEL' char at 127
                cond2 = scope.extended === true && cC >= 32 && cC <= 255 && (cC !== 129 && cC !== 141 && cC !== 143 && cC !== 144 && cC !== 157);
            if (cursor >= 0 && cursor < size) {
              if(cond1 || cond2) {
                scope.buffer[cursor] = cC;
                scope.notPassword.push(cursor);
                cursor++;
                stopEvent(keyEvent);
              }
            }
          };
          
          scope.$watch('buffer[0]', function(newVal){
            if(newVal === 0) {  // .fill(0) called from parent
              scope.notPassword = []; // reset corresponding vars
              cursor = 0;
            }
          });
          
          var stopEvent = function(e) { if (e) { e.preventDefault(); if (e.stopPropagation) { e.stopPropagation(); } else { e.cancelBubble = true; } } };
        }
      }
    };
  });