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
			element.css('display', 'none');
			element.fadeIn(250, done);
			return function() {
				element.stop();
			};
		},
		leave: function(element, done) {
			element.fadeOut(250, done);
			return function() {
				element.stop();
			};
		}
	};
}
