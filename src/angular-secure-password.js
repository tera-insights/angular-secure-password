function ctrl($scope) {
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