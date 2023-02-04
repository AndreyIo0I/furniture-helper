using System.Security.Cryptography;
using System.Text;

namespace ExtranetAPI.Services;

public class PasswordCryptionService : IPasswordCryptionService
{
    private readonly string SecurityKey;

    public PasswordCryptionService(string securityKey)
    {
        SecurityKey = securityKey;
    }
    
    public string EncryptionPassword( string password )
    {
        if ( String.IsNullOrEmpty( password ) )
        {
            return String.Empty;
        }
        
        byte[] toByteArray = UTF8Encoding.UTF8.GetBytes(password);
        var objMD5CryptoService = new MD5CryptoServiceProvider();
        byte[] securityKeyBytes = objMD5CryptoService.ComputeHash(UTF8Encoding.UTF8.GetBytes(SecurityKey));

        objMD5CryptoService.Clear();

        var objTripleDESCryptoService = new TripleDESCryptoServiceProvider();
        objTripleDESCryptoService.Key = securityKeyBytes;
        objTripleDESCryptoService.Mode = CipherMode.ECB;
        objTripleDESCryptoService.Padding = PaddingMode.PKCS7;

        var objCrytpoTransform = objTripleDESCryptoService.CreateEncryptor();
        byte[] resultArray = objCrytpoTransform.TransformFinalBlock(toByteArray, 0, toByteArray.Length);

        objTripleDESCryptoService.Clear();

        return Convert.ToBase64String(resultArray, 0, resultArray.Length);
    }

    public string DecryptionPassword( string encryptedPassword )
    {
        byte[] toEncryptArray = Convert.FromBase64String(encryptedPassword);
        var objMD5CryptoService = new MD5CryptoServiceProvider();
        byte[] securityKeyArray = objMD5CryptoService.ComputeHash(UTF8Encoding.UTF8.GetBytes(SecurityKey));

        objMD5CryptoService.Clear();

        var objTripleDESCryptoService = new TripleDESCryptoServiceProvider();
        objTripleDESCryptoService.Key = securityKeyArray;
        objTripleDESCryptoService.Mode = CipherMode.ECB;
        objTripleDESCryptoService.Padding = PaddingMode.PKCS7;

        var objCrytpoTransform = objTripleDESCryptoService.CreateDecryptor();
        byte[] resultArray = objCrytpoTransform.TransformFinalBlock(toEncryptArray, 0, toEncryptArray.Length);

        objTripleDESCryptoService.Clear();

        return UTF8Encoding.UTF8.GetString(resultArray);
    }
}