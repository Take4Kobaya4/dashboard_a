export const formatDate = (date: string | null): string => {
    if (!date) return '未ログイン';
    
    return new Intl.DateTimeFormat('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    }).format(new Date(date));
}

export const getStatusText = (is_online: boolean): string => {
    return is_online ? 'オンライン' : 'オフライン';
}

export const getStatusColor = (is_online: boolean): string => {
    return is_online ? '#52c41a' : '#ff4d4f';
}