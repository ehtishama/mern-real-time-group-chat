import { api } from "../lib/axios";

export async function getChannels() {
    const { data: channels } = await api.get("/channels");
    return channels;
}

export async function getMembers(channelId) {
    const { data: members } = await api.get(`/channels/${channelId}/members`);
    return members;
}

export async function getMessages(channelId) {
    const { data: messsages } = await api.get(`/messages/${channelId}`);
    return messsages;
}

export async function postMessage(channelId, content) {
    const { data: message } = await api.post(`/messages/${channelId}`, {
        content,
    });
    return message;
}
