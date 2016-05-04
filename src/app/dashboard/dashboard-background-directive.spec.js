describe('backGround', function(){

  var $element, $scope;

  beforeEach(module('livefeed.dashboard'));

  beforeEach(inject(function( _$compile_, _$rootScope_ ) {

    $scope = _$rootScope_;
    $scope.color = '#0E590A';
    $element = _$compile_("<span back-ground data-color='color'></span>")(_$rootScope_);

  }));

  it('should apply background color', function(){
    setStyleFixtures('.bullet { background-color: #0E590A }');
    fixture = setFixtures('<span class="bullet" back-ground data-color="color"></span>');
    $element.scope().$apply();
    var span = fixture.find('.bullet');
    expect(span.css('background-color')).toEqual('rgb(14, 89, 10)');
  });


});