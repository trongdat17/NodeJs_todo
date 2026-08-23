import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
        minlength: 6,
    }
},{timestamps: true});

userSchema.pre('save', async function() {
    if(!this.isModified('password')) return ;
    console.log('test');
    this.password = await bcrypt.hash(this.password,10);
    // next();
})

userSchema.methods.comparePassword = async function(inputPassword){
    // return inputPassword === this.password;
    return bcrypt.compare(inputPassword, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;
