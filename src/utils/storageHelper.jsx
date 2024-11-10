export const getGroupsLocal = () => {
  return JSON.parse(localStorage.getItem('groups')) || [];
};

export const saveGroupLocal = (groups) => {
  localStorage.setItem('groups', JSON.stringify(groups));
};