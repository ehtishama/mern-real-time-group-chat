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

export async function joinChannel(channelId, user) {
    if (!user) throw new Error("You are not authenticated.");

    const { data: members } = await api.post(`/channels/${channelId}/members`);
    return members;
}

export async function createNewChannel(newChannel) {
    const { data: channel } = await api.post("/channels", newChannel);
    return channel;
}
