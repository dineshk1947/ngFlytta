(function () {
  'use strict';
	describe("Testing jsCache", function() {
		it("Testing jsCache creation", function() {
			var cacheObj = jsCache.get("cacheObj");
			if(!cacheObj){
				cacheObj = jsCache.create("cacheObj");
			}
			expect(cacheObj).toBeDefined();
			if(!cacheObj.get("userName")){
				cacheObj.put("userName", "Jagdeep Singh");
			}
			expect(cacheObj.get("userName")).toEqual("Jagdeep Singh");

			var time = setTimeout(function () {
				expect(jsCache.get("cacheObj")).toBe(null);
				clearTimeout(time);
			}, 11000);
		});
	});
})();
