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


// Lớp sleepRecord
class SleepRecord {
    constructor(_type, _bedTime, _wakeupTime) {
        this.type = _type; //night || day
        this.bedTime = _bedTime;
        this.wakeupTime = _wakeupTime;
    }

    getDurationInMinutes() {
        // số phút ngủ của buổi trưa/tối (wakeupTime - bedTime)


    }
}

let nap = new SleepRecord(sleepType, bedTime, wakeupTime);
