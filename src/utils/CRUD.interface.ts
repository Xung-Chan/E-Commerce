interface CRUD {
    create(item: any): Promise<any>;
    readById(id: string): Promise<any | null>;
    updateById(id: string, item: any): Promise<boolean>;
    deleteById(id: string): Promise<boolean>;
    list(): Promise<any[]>;
}
export default CRUD;