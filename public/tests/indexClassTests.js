 describe('Index constructor', function() {
	it('expect to return instance of index', function() {
		console.log(Index);
		const index = new Index('name',12,'symbol',89)
		assert.instanceOf(index,Index,'works');
	})
});
