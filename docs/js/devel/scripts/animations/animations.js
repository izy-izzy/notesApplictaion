/**
 *  Animations used for page transitions
 *  @author lukaskalcok@gmail.com
 */
angular
	.module('notesApp')
	.animation('.reveal-animation', revealAnimation);

function revealAnimation() {
	return {
		enter: function(element, done) {
			angular.element('footer').addClass('fadeingout');
			element.css('display', 'none');
			element.removeClass('leaved');
			element.fadeIn(250, function(){
				angular.element('footer').removeClass('fadeingout');
				element.addClass('entered');
				done();
			});
			return function() {
				element.stop();
			};
		},
		leave: function(element, done) {
			angular.element('footer').addClass('fadeingout');
			element.addClass('entered');
			element.fadeOut(250, function(){
				angular.element('footer').removeClass('fadeingout');
				element.css('display', 'none');
				element.addClass('leaved');
				done();
			});
			return function() {
				element.stop();
			};
		}
	};
}
