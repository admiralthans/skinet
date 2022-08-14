using Core.Entities;
using Core.Entities.Identity;
using Core.Specifications;

namespace Core.Interfaces
{
    public interface ITokenService
    {

        string CreateToken(AppUser user);
        
    }
}