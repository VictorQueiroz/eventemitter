describe('EventEmitter', function() {
	var em;

	beforeEach(function() {
		em = new EventEmitter();
	});

	describe('emit()', function() {
		var listenerSpy;

		beforeEach(function() {
			listenerSpy = jasmine.createSpy();
		});

		it('should emit events', function() {
			em.on('someCoolEvent', listenerSpy);
			
			em.emit('someCoolEvent', 1, 2, 3, 4);
			expect(listenerSpy).toHaveBeenCalledWith(1, 2, 3, 4);
		});

		it('should return "false" if some listener return something that is not undefined and not true', function() {
			em.on('someCoolEvent', noop);

			expect(em.emit('someCoolEvent')).toBeTruthy();

			em.on('someCoolEvent', constant(false));

			expect(em.emit('someCoolEvent')).toBeFalsy();
		});
	});

	describe('on()', function() {
		var listenerSpy;

		beforeEach(function() {
			listenerSpy = jasmine.createSpy();
		});

		it('should add a listener to an event', function() {
			em.on('someCoolEvent', listenerSpy);
			em.emit('someCoolEvent', 1, 2, 3, 4);
			expect(listenerSpy).toHaveBeenCalledWith(1,2,3,4);
		});
	});

	describe('off()', function() {
		var listenerSpy;

		beforeEach(function() {
			listenerSpy = jasmine.createSpy();
		});

		it('should remove event listener', function() {
			em.on('theSameEventAgainFuckIt', listenerSpy);
			em.emit('theSameEventAgainFuckIt', 0);
			expect(listenerSpy).toHaveBeenCalledWith(0);

			em.off('theSameEventAgainFuckIt', listenerSpy);
			em.emit('theSameEventAgainFuckIt', 1);
			expect(listenerSpy).not.toHaveBeenCalledWith(1);
		});
	});

	describe('removeAllListeners()', function() {
		var listenerSpy;

		beforeEach(function() {
			listenerSpy = jasmine.createSpy();
		});

		it('should remove all the listeners of the event emitter', function() {
			for(var i = 0; i < 10; i++) {
				em.on('someEventListener', listenerSpy);
			}
			expect(em._events.someEventListener.length).toBe(10);

			em.removeAllListeners();
			expect(em._events.someEventListener.length).toBe(0);
		});
	});
});