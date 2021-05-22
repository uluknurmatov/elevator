let changeNumbers = (number) => {
    let str = "";
    switch (number) {
        case 1:
            return (str = "Первый");
        case 2:
            return (str = "Второй");
        case 3:
            return (str = "Третий");
        case 4:
            return (str = "Четвертый");
        case 5:
            return (str = "Пятый");
        case 6:
            return (str = "Шестой");
        case 7:
            return (str = "Седьмой");
        case 8:
            return (str = "Восьмой");
    }
};

const message = new SpeechSynthesisUtterance();

const speak = (text) => {
    console.log(text);
    message.text = text.trim();
    if (message.text !== "") {
        speechSynthesis.speak(message);
    }
};

speak("Первый");

$(".floor-number").on("click", async (e) => {
    let floor = +e.target.id;
    if (floor == elevator.currentFloor) {
        speak("Вы находитесь в данном этаже");
        return;
    }
    if (floor < elevator.currentFloor) {
        speak(`Двери закрываются, Спускаемся на ${changeNumbers(floor)} этаж`);
    } else if (floor > elevator.currentFloor) {
        speak(
            `Двери закрываются,  Поднимаемся на ${changeNumbers(floor)} этаж`
        );
    }
    closeElev();
    await sleep(500);
    elevator.toFloor(floor);
});

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

let elevTop = 767;

let upElev = () => {
    elevTop -= 70;
    $(".closeElev img").css("top", `${elevTop}px`);
    $(".openElev img").css("top", `${elevTop}px`);
};

let downElev = () => {
    elevTop += 70;
    $(".closeElev img").css("top", `${elevTop}px`);
    $(".openElev img").css("top", `${elevTop}px`);
};

let openElev = () => {
    $(".closeElev img").css("display", "none");
    $(".openElev img").css("display", "block");
};

let closeElev = () => {
    $(".closeElev img").css("display", "block");
    $(".openElev img").css("display", "none");
};

let elevator = {
    currentFloor: 1,
    minFloor: 1,
    maxFloor: 8,
    printFloor() {
        $("#current-floor__span").html(`${this.currentFloor}`);
    },
    upOneFloor() {
        if (this.currentFloor < this.maxFloor) {
            this.currentFloor++;
            this.printFloor();
        } else {
            alert("Ошибка");
        }
    },
    downOneFloor() {
        if (this.currentFloor > this.minFloor) {
            this.currentFloor--;
            this.printFloor();
        } else {
            alert("Ошибка");
        }
    },
    async toFloor(getFloor) {
        while (this.currentFloor !== getFloor) {
            if (getFloor > this.currentFloor && getFloor <= this.maxFloor) {
                await sleep(1000);
                this.upOneFloor();
                upElev();
            } else if (
                getFloor < this.currentFloor &&
                getFloor >= this.minFloor
            ) {
                await sleep(1000);
                this.downOneFloor();
                downElev();
            } else {
                alert("Ошибка");
            }
        }
        await sleep(1500);
        openElev();
        speak(`${changeNumbers(this.currentFloor)} этаж. Двери открываются `);
    },
};
