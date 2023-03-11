using ExtranetAPI.Analytics.Models;
using ExtranetAPI.Models;

namespace ExtranetAPI.Analytics.Services.Builders;

public interface IProjectNumericalIndicatorsBuilder
{
    Task<NumericalIndicatorsDto> Build( NumericalPeriodDto period );
}