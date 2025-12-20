// Lớp sleepDate, bao gồm:
    // Thuộc tính ngày: Từ ngày 1 đến ngày 31
    // Thuộc tính sleepRecord: nightSleep || daySleep
    // Phương thức: 
        // Hiển thị các đối tượng sleepRecord
        // Hiển thị đối tượng totalSleep

// Lớp totalSleep, bao gồm (có nên cho cái này thành 1 class không?)
    // Thuộc tính colorSign: Tốt (>80%: Xanh || 50%-70%: Vàng || <50%: Đỏ)
    // Phương thức calTotalHour: Tính tổng số giờ ngủ trong ngày
    // Phương thức calPercent: So sánh số giờ ngủ được với giờ ngủ mục tiêu theo %


// Lớp sleepDate
class SleepDate {
    constructor(_id, _day, _date) {
        this.id = _id;
        this.day = _day;
        this.date = _date;
        this.bedTime = "23:45";
        this.wakeupTime = "07:45";
    }

    getDateOfDay() {
        let arr = this.date.split("-");
        return arr[0];
    }

    getFullDay() {
        return this.day + "<br>" + this.getDateOfDay();
    }

    getBedTime() {
        return `<div class="bed-time">
                    <p>Bed time</p>
                    <p>${this.bedTime}</p>
                </div>`
    }

    getWakeupTime() {
        return `<div class="wakeup-time">
                    <p>Wakeup time</p>
                    <p>${this.wakeupTime}</p>
                </div>`
    }



}
