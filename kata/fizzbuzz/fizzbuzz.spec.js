describe("The fizzbuzz player", function () {
    var player;

    expectResult(null, null);
    expectResult("1", 1);
    expectResult("2", 2);
    expectResult("fizz", 3);
    expectResult("4", 4);
    expectResult("buzz", 5);
    expectResult("fizz", 6);
    expectResult("7", 7);
    expectResult("8", 8);
    expectResult("fizz", 9);
    expectResult("buzz", 10);
    expectResult("11", 11);
    expectResult("fizz", 12);
    expectResult("13", 13);
    expectResult("14", 14);
    expectResult("fizzbuzz", 15);
    expectResult("16", 16);
    expectResult("17", 17);
    expectResult("fizz", 18);
    expectResult("19", 19);
    expectResult("buzz", 20);
    expectResult("fizz", 21);
    expectResult("22", 22);
    expectResult("23", 23);
    expectResult("fizz", 24);
    expectResult("buzz", 25);
    expectResult("26", 26);
    expectResult("fizz", 27);
    expectResult("28", 28);
    expectResult("29", 29);
    expectResult("fizzbuzz", 30);

});

function expectResult(expected, number) {
    var player = new fizzBuzzPlayer();
    var result = player.play(number);

    describe("given " + number, function () {
        it("returns " + expected, function () {
            expect(result).toEqual(expected);
        })
    });

};

function fizzBuzzPlayer() {
    return {
        play: function (entry) {
            if (entry == null)
                return null;

            if (isDivBy(3, entry) && isDivBy(5, entry))
                return "fizzbuzz";

            if (isDivBy(3, entry))
                return "fizz";

            if (isDivBy(5, entry))
                return "buzz";

            return entry.toString();
        }
    }
}

function isDivBy(devBy, entry) {
    return Number.isInteger(entry / devBy);
}