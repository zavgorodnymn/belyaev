import React from 'react';
import './ScheduleTable.css';

const ScheduleTable = ({ schedules }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const timeSlots = ['8:00', '9:45', '11:30', '13:30', '15:15', '17:00'];

  const getScheduleForSlot = (day, time) => {
    return schedules.find(schedule => 
      schedule.dayOfWeek === day && 
      schedule.startTime === time
    );
  };

  return (
    <div className="schedule-table">
      <table>
        <thead>
          <tr>
            <th>Time</th>
            {days.map(day => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeSlots.map(time => (
            <tr key={time}>
              <td>{time}</td>
              {days.map(day => {
                const schedule = getScheduleForSlot(day, time);
                return (
                  <td key={`${day}-${time}`}>
                    {schedule && (
                      <div className={`schedule-cell ${schedule.type}`}>
                        <div className="course-title">{schedule.course.title}</div>
                        <div className="room">Room: {schedule.room}</div>
                        <div className="teacher">
                          {schedule.teacher.profile.firstName} {schedule.teacher.profile.lastName}
                        </div>
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ScheduleTable; 