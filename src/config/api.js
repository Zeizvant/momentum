export const API_ENDPOINTS = {
    დეპარტამენტი: 'https://momentum.redberryinternship.ge/api/departments',
    პრიორიტეტი: 'https://momentum.redberryinternship.ge/api/priorities',
    თანამშრომელი: 'https://momentum.redberryinternship.ge/api/employees',
    tasks: 'https://momentum.redberryinternship.ge/api/tasks',
    statuses: 'https://momentum.redberryinternship.ge/api/statuses',
    taskComments: (id) => `https://momentum.redberryinternship.ge/api/tasks/${id}/comments`
};

export const API_TOKEN = 'Bearer 9e7c790a-d20a-480b-800f-41cf804caad9';