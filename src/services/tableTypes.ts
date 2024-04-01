import TableType from '@/models/TableType';

export async function getTypes() {
    const types = await TableType.find();

    return types.map(({ type }) => type);
}

export async function addType(type: string) {
    const typeExists = (await TableType.exists({ type })) !== null;

    if (!typeExists) {
        await TableType.create({ type });
    }
}
