interface CRUD {
    create(item: any): Promise<any>;
    readById(id: string): Promise<any | null>;
    patchById(id: string, item: Partial<any>): Promise<boolean>;
    deleteById(id: string): Promise<boolean>;
    list(): Promise<any[]>;
    findBy(query: Partial<any>): Promise<any | null>;
}
export default CRUD;