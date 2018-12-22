if(process.env.NODE_ENV === 'production'){
    module.exports = {mongoURI : 'mongodb://kdkanishka:pagero1%23@ds139370.mlab.com:39370/kanimongo'};
}else{
    module.exports = {mongoURI : 'mongodb://dev.localhost/httpduck'};
}