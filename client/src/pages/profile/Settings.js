import React from 'react';

const Settings = () => {
  return (
    <div>
      <h2>Настройки профиля</h2>
      <form>
        <div>
          <label>Email уведомления</label>
          <input type="checkbox" />
        </div>
        <div>
          <label>Тема</label>
          <select>
            <option value="light">Светлая</option>
            <option value="dark">Темная</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default Settings; 