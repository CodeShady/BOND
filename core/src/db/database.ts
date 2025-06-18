class Database {
  private db: any;

  constructor(private dbFile: string) {
    const sqlite3 = require("sqlite3").verbose();
    this.db = new sqlite3.Database(dbFile);
  }

  public connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.serialize(() => {
        this.db.run("PRAGMA foreign_keys = ON", (err: any) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    });
  }

  public disconnect(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err: any) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
  }

  public executeQuery(query: string, params: any[] = []): Promise<any> {
    return new Promise((resolve, reject) => {
      this.db.all(query, params, (err: any, rows: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

export default Database;