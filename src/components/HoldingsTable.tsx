
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

const holdings = [
  {
    fund: 'Blackstone Capital Partners VIII',
    type: 'Private Equity',
    commitment: '$125M',
    invested: '$98M',
    value: '$142M',
    irr: '24.8%',
    multiple: '1.45x'
  },
  {
    fund: 'Bridgewater All Weather',
    type: 'Hedge Fund',
    commitment: '$200M',
    invested: '$200M',
    value: '$218M',
    irr: '12.4%',
    multiple: '1.09x'
  },
  {
    fund: 'Brookfield Infrastructure Fund IV',
    type: 'Infrastructure',
    commitment: '$150M',
    invested: '$112M',
    value: '$134M',
    irr: '18.2%',
    multiple: '1.20x'
  },
  {
    fund: 'Prologis Logistics Venture',
    type: 'Real Estate',
    commitment: '$100M',
    invested: '$85M',
    value: '$102M',
    irr: '16.7%',
    multiple: '1.20x'
  }
];

const HoldingsTable = () => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Card className="bg-white shadow-sm border border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900">Top Holdings</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          {holdings.map((holding, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-2">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-sm text-gray-900 leading-tight">{holding.fund}</h4>
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 ml-2 flex-shrink-0">
                  {holding.type}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-gray-500">Commitment:</span>
                  <p className="font-medium">{holding.commitment}</p>
                </div>
                <div>
                  <span className="text-gray-500">Invested:</span>
                  <p className="font-medium">{holding.invested}</p>
                </div>
                <div>
                  <span className="text-gray-500">Current Value:</span>
                  <p className="font-medium">{holding.value}</p>
                </div>
                <div>
                  <span className="text-gray-500">IRR:</span>
                  <p className="font-medium text-green-600">{holding.irr}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-1 border-t">
                <span className="text-xs text-gray-500">Multiple:</span>
                <span className="font-medium text-sm">{holding.multiple}</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-gray-900">Top Holdings</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fund Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Commitment
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invested
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current Value
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  IRR
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Multiple
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {holdings.map((holding, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {holding.fund}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {holding.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                    {holding.commitment}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right">
                    {holding.invested}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                    {holding.value}
                  </td>
                  <td className="px-6 py-4 text-sm text-green-600 text-right font-medium">
                    {holding.irr}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 text-right font-medium">
                    {holding.multiple}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default HoldingsTable;
