namespace ExtranetAPI.Services;

public interface IPasswordCryptionService
{
    string EncryptionPassword(string password);
    string DecryptionPassword(string encryptedPassword);
}