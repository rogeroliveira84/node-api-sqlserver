import delay from './delay';

const clients = [
    {
        clientId: 1,
        clientName: 'Roger',
        birthDate: '03/11/1984',
        createdOn: '06/03/2019 20:00'
    },
    {
        clientId: 2,
        clientName: 'Paulo',
        birthDate: '04/12/1982',
        createdOn: '02/01/2019 21:00'
    },
    {
        clientId: 3,
        clientName: 'Joaquim',
        birthDate: '02/10/1994',
        createdOn: '04/03/2019 10:00'
    }
];

//This would be performed on the server in a real app. Just stubbing in.
const generateId = (client) => {
    return client.clientId;
};

class ClientApi {
    static getAllClients() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Object.assign([], clients));
            }, delay);
        });
    }

    static saveAuthor(client) {
        client = Object.assign({}, client); // to avoid manipulating object passed in.
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Simulate server-side validation
                const minClientNameLength = 3;
                if (client.clientName.length < minClientNameLength) {
                    reject(`Client Name must be at least ${minClientNameLength} characters.`);
                }

                if (client.clientId) {
                    const existingClientIndex = clients.findIndex(a => a.clientId == client.clientId);
                    clients.splice(existingClientIndex, 1, client);
                } else {
                    //Just simulating creation here.
                    //The server would generate ids for new clients in a real app.
                    //Cloning so copy returned is passed by value rather than by reference.
                    client.clientId = generateId(client);
                    clients.push(client);
                }

                resolve(client);
            }, delay);
        });
    }
};

export default ClientApi;