import Model from "./Model";
class NoteModel extends Model {
  protected table = "/notes";
  public relasi() {
    return 0;
  }
  public async addNote(data: any) {
    try {
      const user = localStorage.getItem("user");
      const userId = JSON.parse(user ?? "").id;
      data.user_id = userId;
      const result = await this.create(data);
      return result;
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
  public async updateNote(id: string, data: any) {
    try {
      const user = localStorage.getItem("user");
      const userId = JSON.parse(user ?? "").id;
      data.user_id = userId;
      data.id = id;
      const result = await this.update(id, data);
      return result;
    } catch (error) {
      console.error("Error adding note:", error);
    }
  }
}

export default NoteModel;
