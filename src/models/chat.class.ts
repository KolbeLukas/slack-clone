export class Chat {
  firstName: string;
  lastName: string;
  profilImg: string;
  message: string;
  weight: boolean;
  italic: boolean;
  chatId: number;
  chatDate: any;

  constructor(obj?: any) {
    this.firstName = obj ? obj.firstName : 'Dominik';
    this.lastName = obj ? obj.lastName : 'Graf';
    this.profilImg = obj ? obj.profilImg : 'ghost.png';
    this.message = obj ? obj.message : 'Test 1';
    this.weight = obj ? obj.weight : false;
    this.italic = obj ? obj.italic : false;
    this.chatId = obj ? obj.chatId : 0;
    this.chatDate = obj ? obj.chatDate : '';
  }

  public toJSON() {
    return {
      firstName: this.firstName,
      lastName: this.lastName,
      profilImg: this.profilImg,
      message: this.message,
      weight: this.weight,
      italic: this.italic,
      chatId: this.chatId,
      chatDate: this.chatDate,
    };
  }
}
