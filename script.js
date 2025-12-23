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
                    <div class="bed-time">
                    <p>Bed time</p>
                    <p>${this.bedTime}</p>
                </div>
                <div class="wakeup-time">
                    <p>Wakeup time</p>
                    <p>${this.wakeupTime}</p>
                </div>
                <button class="update-btn" data-bs-toggle="modal" data-bs-target="#input-modal">Cập nhật giờ ngủ</button>
                </div>`
    }

    timeToMinutes(bedTime, wakeupTime) {
        // đổi giờ ngủ ra phút
        let parts1 = bedTime.split(":");
        let bedHour = parseInt(parts1[0]);
        let bedMin = parseInt(parts1[1]);
        let totalBedMin = bedHour*60 + bedMin;
        // đổi giờ dậy ra phút
        let parts2 = wakeupTime.split(":");
        let wakeupHour = parseInt(parts2[0]);
        let wakeupMin = parseInt(parts2[1]);
        let totalWakeupMin = wakeupHour*60 + wakeupMin;

        let totalSleepMin = 0;
        // ngủ qua ngày
        if(totalWakeupMin < totalBedMin) {
            totalSleepMin = (24*60 - totalBedMin) + totalWakeupMin;
        } else {
            totalSleepMin = totalWakeupMin - totalBedMin;
        }
        
        return totalSleepMin; 
    }
    getTotalHours() {
        let totalSleepMin = this.timeToMinutes(this.bedTime, this.wakeupTime);
        let totalHour = Math.floor(totalSleepMin/60);
        let totalMin = Math.floor(totalSleepMin%60);
        return `<div class="total-hour">
                    <p>Your Last Day Sleep</p>
                    <p>${totalHour}H ${totalMin}MIN</p>
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
        for(let i=0; i<days.length; i++) {
            let day = days[i];
            let bedTime = day.bedTime;
            let wakeupTime = day.wakeupTime;

            if(bedTime === "00:00" && wakeupTime === "00:00") {
                continue;
            } 
            dayLogged++
        
            let dayTotalSleepMin = day.timeToMinutes(bedTime, wakeupTime);
            weekTotalSleepMin += dayTotalSleepMin;
        }
        this.allWeekSleepMin = weekTotalSleepMin; // lưu lại vào thuộc tính

        // điều kiện hiển thị status
        if (dayLogged === 0) {
            this.status = "Update sleep time to know more about your sleep quality";
            return 0;
        }

        let avgMin = this.allWeekSleepMin/dayLogged;
        if(avgMin<360) {
            this.status = "Bad"
        } else if(avgMin >= 420) {
            this.status = "Very good"
        } else {
             this.status = "Normal"
        }
        return weekTotalSleepMin;

       
    }

    getWeekTotalSleep() {
        let allWeekSleepHour = Math.floor(this.allWeekSleepMin/60);
        
        return `<div>
                    <p>Sleep ${allWeekSleepHour}</p>
                    <p>Your sleep quality<p>
                    <p>${this.status}</p>
                </div>`
    }


}
