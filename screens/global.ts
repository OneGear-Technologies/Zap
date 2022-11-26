class DummyUserData {
    private walletAmount:number = 1000;
    private userName:string = 'Bob'
    // you can define more variables

    public get_myNumber(){
        return this.walletAmount;
    }

    public set_myNumber(new_number:number){
        this.walletAmount = new_number;
    }

    public get_myName(){
        return this.userName;
    }

    public set_myName(new_name:string){
        this.userName = new_name;
    }

}

export default new DummyUserData() 
