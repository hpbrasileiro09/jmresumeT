
export default function useEntriesApi() {

    const url = 'http://localhost:3005/entries';

    async function updateRequest(id: number, data: any) {
    const response = await fetch(`${url}/${id}`, {
        method: 'PATCH',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
    }

    async function addRequest(data: any) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    return response.json();
    }

    async function deleteRequest(id: number) {
    const response = await fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        }
    });
    return response.json();
    }

    async function getRequest() {
    const response = await fetch(url);
    return response.json();
    }

    async function getOneRequest(id: number) {
    const response = await fetch(`${url}/${id}`, {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        }
    });
    return response.json();
    }

    return {
        url,
        updateRequest,
        addRequest,
        deleteRequest,
        getRequest,
        getOneRequest
    }
}