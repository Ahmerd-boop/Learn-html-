const canvas = document.getElementById("gameCanvas");
        const ctx = canvas.getContext("2d");
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let fruits = [];
        let score = 0;
        let gameRunning = true;

        class Fruit {
            constructor(x, y, type) {
                this.x = x;
                this.y = y;
                this.radius = 40;
                this.type = type;
                this.speed = Math.random() * 5 + 3;
                this.angle = Math.random() * Math.PI * 2;
                this.vx = Math.cos(this.angle) * this.speed;
                this.vy = Math.sin(this.angle) * this.speed;
            }
            draw() {
                ctx.beginPath();
                ctx.fillStyle = this.type === "fruit" ? "#FF0000" : "black";
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
            update() {
                this.x += this.vx;
                this.y += this.vy;
            }
        }

        function spawnFruit() {
            let x = Math.random() * canvas.width;
            let y = canvas.height;
            let type = Math.random() < 0.8 ? "fruit" : "bomb";
            fruits.push(new Fruit(x, y, type));
        }

        function updateGame() {
            if (!gameRunning) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            fruits.forEach((fruit, index) => {
                fruit.update();
                fruit.draw();
                if (fruit.y < -50) fruits.splice(index, 1);
            });
            requestAnimationFrame(updateGame);
        }

        canvas.addEventListener("click", (e) => {
            fruits.forEach((fruit, index) => {
                let dist = Math.hypot(e.clientX - fruit.x, e.clientY - fruit.y);
                if (dist < fruit.radius) {
                    if (fruit.type === "fruit") {
                        score += 10;
                        document.getElementById("score").innerText = "Score: " + score;
                    } else {
                        alert("Game Over! Your Score: " + score);
                        gameRunning = false;
                    }
                    fruits.splice(index, 1);
                }
            });
        });

        setInterval(spawnFruit, 1000);
        updateGame();


        