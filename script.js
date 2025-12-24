class SleepDate {
    constructor(_id, _day, _date, _bedTime, _wakeupTime) {
        this.id = _id;
        this.day = _day;
        this.date = _date;
        this.bedTime = "00:00";
        this.wakeupTime = "00:00";
    }

    updateSleepTime(bedTime, wakeupTime) {
        this.bedTime = bedTime;
        this.wakeupTime = wakeupTime;

    }

    getDateOfDay() {
        let arr = this.date.split("-");
        return arr[0];
    }

    getFullDay() {
        return this.day + "<br>" + this.getDateOfDay();
    }

    getFullTime() {
        return `<div>
                    <div class="bed-time card p-4 bg-green">
                    <p class="fs-5">Bed time</p>
                    <p class="fs-3">${this.bedTime}</p>
                    <button class="update-btn btn btn-success" data-bs-toggle="modal" data-bs-target="#bedtime-modal">Cập nhật giờ ngủ</button>

                </div>
                <div class="wakeup-time card p-4 bg-yellow"">
                    <p class="fs-5">Wakeup time</p>
                    <p class="fs-3">${this.wakeupTime}</p>
                    <button class="update-btn btn btn-warning" data-bs-toggle="modal" data-bs-target="#wakeup-modal">Cập nhật giờ dậy</button>

                </div>
                </div>`
    }

    timeToMinutes(bedTime, wakeupTime) {
        // đổi giờ ngủ ra phút
        let parts1 = bedTime.split(":");
        let bedHour = parseInt(parts1[0]);
        let bedMin = parseInt(parts1[1]);
        let totalBedMin = bedHour * 60 + bedMin;
        // đổi giờ dậy ra phút
        let parts2 = wakeupTime.split(":");
        let wakeupHour = parseInt(parts2[0]);
        let wakeupMin = parseInt(parts2[1]);
        let totalWakeupMin = wakeupHour * 60 + wakeupMin;

        let totalSleepMin = 0;
        // ngủ qua ngày
        if (totalWakeupMin < totalBedMin) {
            totalSleepMin = (24 * 60 - totalBedMin) + totalWakeupMin;
        } else {
            totalSleepMin = totalWakeupMin - totalBedMin;
        }

        return totalSleepMin;
    }
    getTotalHours() {
        let totalSleepMin = this.timeToMinutes(this.bedTime, this.wakeupTime);
        let totalHour = Math.floor(totalSleepMin / 60);
        let totalMin = Math.floor(totalSleepMin % 60);
        return `<div class="total-hour mt-4 card p-3 bg-purple">
                    <p class="fs-5">Your Last Day Sleep</p>
                    <p class="fs-3">${totalHour}H ${totalMin}MIN</p>
                </div>`
    }
}

class SleepOverall {
    constructor(_allWeekSleepMin, _status) {
        this.allWeekSleepMin = 0;
        this.status = "Update sleep time to know more about your sleep quality";
    }

    calWeekTotalSleep(days) {
        let weekTotalSleepMin = 0;
        let dayLogged = 0; //số ngày có data
        for (let i = 0; i < days.length; i++) {
            let day = days[i];
            let bedTime = day.bedTime;
            let wakeupTime = day.wakeupTime;

            if (bedTime === "00:00" && wakeupTime === "00:00") {
                continue;
            }
            dayLogged++

            let dayTotalSleepMin = day.timeToMinutes(bedTime, wakeupTime);
            weekTotalSleepMin += dayTotalSleepMin;
        }
        this.allWeekSleepMin = weekTotalSleepMin; // lưu lại vào thuộc tính

        // điều kiện hiển thị status
        if (dayLogged === 0) {
            this.status = "Update sleep time to know more about your sleep quality.";
            return 0;
        }

        let avgMin = this.allWeekSleepMin / dayLogged;
        if (avgMin < 360) {
            this.status = "Bad. You need to sleep more often"
        } else if (avgMin >= 420) {
            this.status = "Very good. Keep it up!"
        } else {
            this.status = "Normal. Sleep more to feel much better!"
        }
        return weekTotalSleepMin;


    }

    getWeekTotalSleep() {
        let allWeekSleepHour = Math.floor(this.allWeekSleepMin / 60);

        return `<div class="sleep-quality card p-3 bg-mint">
                    <p class="fs-6 mb-1">Sleep <span class="fw-bold">${allWeekSleepHour}H</span></p>
                    <p class="fs-2 mb-0">Your sleep quality<p>
                    <p class="fw-lighter fs-5 mt-2" >${this.status}</p>
                </div>`
    }


}
