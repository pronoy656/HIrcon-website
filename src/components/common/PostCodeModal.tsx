import React from 'react';
import { X } from 'lucide-react';

interface PostCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect?: (address: string) => void;
}

const postCodeData = [
  "B V Biomedical, Magdalen Centre, 1 Robert Robinson Avenue Oxford, OX4 4GA",
  "B V B Motorsport, Wytham Court, 11 West Way Oxford, OX2 0QL",
  "B V Cafe, 1 Briary Barn, Blisworth Hill Farm, Stoke Road Blisworth, Northampton, NN7 3DB",
  "B V A, The Orchard, White Hart Lane Basingstoke, RG21 4AF",
  "B B V, Site Office, Coleshill Heath Road Coleshill, Birmingham, B46 3HN",
  "B V Tools, Unit 17, Park Farm Industrial Estate, Ermine Street Buntingford, SG9 9AZ",
  "B V S Brackley Ltd, Unit 4, Buckingham Court Brackley, NN13 7EU",
  "B H V Broadcast Ltd, The Vision Centre, 5 Eastern Way Bury St. Edmunds, IP32 7AB",
  "B B V Ltd, Bacres, Quarry Road Hornton, Banbury, OX15 6DF",
  "B B V A, 1 Canada Square London, E14 5AA",
  "B B V A, Po Box 73205 London, E14 1QL",
  "B B V C Ltd, Parkhouse Garage, Talke Road Chesterton, Newcastle, ST5 7NL",
  "B B Vintage, 11 Silver Street Trowbridge, BA14 8AA",
  "B B V Ltd, Royal Edward Dock Bristol, BS11 9BT",
  "B B V S, Old Oak Common Depot, Old Oak Common Lane London, NW10 6DZ",
  "Woodford V B R, Unit B, 9 Sir Alfred Owen Way Pontygwindy Industrial Estate Caerphilly, CF83 3HU",
  "B V D, Po Box 2119 Croydon, CR90 9QU",
  "Homebake B V, Po Box 8113 Kettering, NN16 6YG",
  "B M V, 8 The Broadway Woodford Green, IG8 0HL",
  "B B Van Hire & Sales Ltd, 4 Cannon Road Heathfield Industrial Estate, Newton Abbot, TQ12 6SG",
  "B & B Vending, Haven House, Unit 2B, Crown Road Stoke-on-Trent, ST1 5NJ",
  "B & B Vending, Pooley Lane Polesworth, Tamworth, B78 1JA",
  "B & B Vehicle Contracts Ltd, 5A, Fairfield Road Chesterfield, S40 4TR",
  "B & B Vehicle Services, 191A-193, Leighton Avenue Leigh-on-Sea, SS9 1PX",
  "B & B Vending Ltd, Unit 803, Lowfield Drive Centre 500 Wolstanton, Newcastle, ST5 0UU",
  "V C B Brokerage Ltd, Unit 11C, Reeds Farm Estate, Roxwell Road Writtle, Chelmsford, CM1 3ST",
  "V I B Barbers, 46 Dads Lane Birmingham, B13 8PQ",
  "V B R Bodyshop, Bolton Road Blackburn, BB2 3PZ",
  "Y V B Bookkeeping Services Ltd, Oaktree House, 408 Oakwood Lane Leeds, LS8 3LG",
  "V B Lewis Building Design, 2 Market House, Market Place Sturminster Newton, DT10 1AS",
  "V & B Butchers, 22B, Oakley Lane Oakley, Basingstoke, RG23 7JY",
  "Balfour Beatty Vinci, Site Office, Coleshill Heath Road Coleshill, Birmingham, B46 3HN",
  "B & B Vending Ltd, Haven House, Unit 2B, Crown Road Stoke-on-Trent, ST1 5NJ"
];

export function PostCodeModal({ isOpen, onClose, onSelect }: PostCodeModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#081b4c] shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Post Codes</h2>
            <p className="text-sm text-blue-200 mt-1">Available post code formats and details</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-col overflow-y-auto px-6 py-2 bg-white">
          <div className="flex flex-col">
            {postCodeData.map((address, idx) => (
              <div 
                key={idx} 
                className="py-4 text-sm font-medium text-gray-700 border-b border-gray-100 last:border-0 hover:text-[#081b4c] transition-colors cursor-pointer"
                onClick={() => {
                  if (onSelect) onSelect(address);
                  onClose();
                }}
              >
                {address}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t border-gray-100 flex justify-end bg-white">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
