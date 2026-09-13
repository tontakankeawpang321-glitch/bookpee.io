import { ThaiDocBook } from '../types';

export const RAW_SHEETS_CSV = {
  sheet1: `category,title,description,url
หนังสือทั่วไป,Flatland_ A Romance of Many Dimensions_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1qz-ZlpuBExVPG7a9PazgsRinlIZd-Kwk/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Cambridge Natural History_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1iDJyaSLBHt3sCJ7L_3H9yJpaKBEcR9FJ/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,"Lamarck, the Founder of Evolution: His Life and Work_ฉบับภาษาไทย.docx",,https://docs.google.com/document/d/1zdXCLQBNw4oJiZca2neMrA9iUaQfU0Fb/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Amusements in Mathematics_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1YhqsYKVvb8Lt9wkeSbQCBym0sshDxuJN/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Audubon the Naturalist A History of His Life and Time Vol. 2_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ZN0V_aFP1hOMFeahV3dhKTMmLI9CSUbz/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Curious Facts in the History of Insects; Including Spiders and Scorpions_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/12k4XpSdW65MMJaWTb4uqsC05gsAe3_ng/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Anatomy of Melancholy_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/12d_LBzEwZ0ihLBO8syivW6GutSq_r6An/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Life of Jesus Critically Examined_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1b8ngpyWKML1uauzKYOrw1o8iEiG5paNy/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Alice's Adventures in Wonderland_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1LgKcito_bvaxSXIXSu6v7qsJTZlRUngD/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Jane Eyre_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1eUXOeJv-jQj8gofSuZXJyGwjFfG5cvGk/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Meditations_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1RZImaRwyA56f-A-58L7SqSlHD_Qs3kyN/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Middlemarch_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1a_xoGmrQ1nyC1LU8S20zZGnhz69clLPW/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Moby Dick_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1-r8NjW8mP31hPb9G66ev2MFcIKbrWv2o/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,My Life — Volume 1_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1iNoIb_IxSFDEhyyF0dC_ggI-F46Ug1Xc/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Poems of American History_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1G7GrrNv7ZsaBHplftS4PA3zv3LEGPDYf/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Romeo and Juliet_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1l1ga666BoN9TXnxNGEkn_dKE4GSWfWEZ/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Adventures of Ferdinand Count Fathom_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1UM88PbjmbNhHwDqW6MqW45qrXM5Lnmhh/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Adventures of Sherlock Holmes_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1YZfNQdcz0-2Ukh-2nb33jLBxhCakTgq_/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Blue Castle_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/10Pl_r3sPmXanmJhDCAlMFo8rnfIrNP9J/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Brothers Karamazov_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1hNs92GdD4yEN_q7kxLHOMm0IuABnyzKW/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Complete Works of William Shakespeare_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1U2Tox95ejxNyAMrCiAil2slO0BPTMB34/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Enchanted April_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1UzTt270x8TpIorNarXBk79D49ES2l-au/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Expedition of Humphry Clinker_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1j08uzk9hFi3YT9ngyX9e4DLg2BxIbm6r/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Flapper Wife_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1Det2BkpfMpD1LfHmCExsQ_JG0Xz6rJjC/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The King in Yellow_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1TL3cbrYFCfu15RO-DbGowg0bQAH8ZFou/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Great Expectations_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1KpJzYyTfEdnupA7IzhDpwETVjNXPvv1gmaTZfk39nyY/edit?usp=drivesdk
หนังสือทั่วไป,The Benefit of Farting Explain’d_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1kdpUnPbJ8w8BYJvFIXa2mjbPwDfiZ_lV9g4MsAP2C4k/edit?usp=drivesdk
หนังสือทั่วไป,Thus Spake Zarathustra_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1rkc4DuE0o6QprAfW_Qf67WY9pgrCHV21/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Hound of the Baskervilles_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1UMTtIRzPZCssrDKqOiaFrUzQ2EbZGUgX/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Works of William Shakespeare [Cambridge Edition] [Vol. 8 of 9]_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/18XToXLmmpltjQptrU5qYAI1PD8s_gvyM/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Manual of Surgery Volume 2_ Extremities—Head—Neck_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/12zGrtP7YqLvYSfArZ2nlniUr4PBNTYDO/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Pharmacographia_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1S1hlx3bTQsH6BKvn5U0-urOXl-6MFZhk/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Life of Joan of Arc_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1nDeTvEC3OObf8Z89K3Tia0MNXIDTonw-/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Scarlet Letter_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1EBvWaO0NhCGxbcCqfSm59444_UCe-V6m/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,"A History of Magic and Experimental Science, Volume 1_ฉบับภาษาไทย.docx",,https://docs.google.com/document/d/1YhYxtY_Xs2RczThxqI6y9NTaHPc0PG9g/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Flesh_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1dp2CFhWpJWkRAPQBNFNRDdliSTWA4mDd/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Grimms' Fairy Tales_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1I5wraDlwx4SvUiLoQ6hJ1L6OdsiMH0dqH3BEJZCF-j0/edit?usp=drivesdk
หนังสือทั่วไป,Wuthering Heights_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/18w_KdM0Q_DFwi7gExMD0Oq61B-pN6IZY/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Cranford_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1rDcM1wdT0sbXPJnowk0w6MMkXYfL5bdR/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,A Room with a View_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ZjjrdXLVKBqLFS34C3QvlNdISpYl8ojh/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,A Tale of Two Cities_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1NzImw2-RY_dZfmNKTOqKqewyeQAknXZv/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Journeys_and_Experiences_in_Argentina_ฉบับภาษาไทย,,https://docs.google.com/document/d/1wAjmDZmKkDIdc-Vat591yWritPjQAzo-UU2fCmJs90Q/edit?usp=drivesdk
หนังสือทั่วไป,Crime and Punishment_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1rjTglLXVI4zX72SXZfxYJyY_lA09FfMW/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Frankenstein_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1wqI6QDFjgKTar-euhL0J4SmbIJnG5JVD/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Dracula_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ulTi_WgfFcic8asBe8sReuiv3MbjeSMW/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Odyssey_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1XaMM1k0Locl6ShKVXS1tGlWScBFOb8Ww/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Picture of Dorian Gray_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ppCTj_YzeSOoGA9yrMxpqPu3nM9zVTAG/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,The Strange Case of Dr. Jekyll and Mr. Hyde_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1XAF37WhvOnXIpnYU81XXyKPCoOYhK_tJ/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true
หนังสือทั่วไป,Twenty Years After_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1k0_HhDTKqXXsWiM2CLYtOOvx4yxVY4N5/edit?usp=drivesdk&ouid=107801160609654667033&rtpof=true&sd=true`,

  sheet2: `category,title,description,url
หนังสือทั่วไป,Plant_Lore_Legends_and_Lyrics_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1Lg_8U2oH2IjEiOvDmyCmF39GdgmyR-bt/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,A_History_of_Magic_and_Experimental_Science_Volume_1_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ogddY2c_BuJ_7kXX4sqiQIoHqa82Ktc9/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,The_Story_of_the_Universe_Volume_3_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1U9C570NScw_u4F_xXd6EtxDqxWFKkFn5/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Lichens_ฉบับภาษาไทย,,https://docs.google.com/document/d/1vxoJf6utQQhI0obm0mOJ1tf93MT_zClSkDZSYX35xgI/edit?usp=drivesdk
หนังสือทั่วไป,Goethes_Theory_of_Colours_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1tR_QtY5DU3A0rZJuw8326KBu70t3FKSS/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,A_History_of_Magic_and_Experimental_Science_Volume_2_ฉบับภาษาไทย,,https://docs.google.com/document/d/1W0FESA5w22MUNqgWPNjPahe9T40dR5hBczUbd13Jojs/edit?usp=drivesdk
หนังสือทั่วไป,Life_and_Letters_of_Charles_Darwin_Volume_1_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1vg06n7EYX8nZKBVzpEXiZGVe1r881mMd/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,On_the_Origin_of_Species_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/139ifHS-koR8L9bPXqwyApBeKjB_sikqR/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,The_World_of_Homer_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1jo0xmwnLDw0JE1pM05GQfvNpeV_OCX3l/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,The_Natural_History_of_Pliny_Vol_III_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/19pI4iuc3eVJXKognBG3ne3bQ_tz59P3U/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,The_Philippine_Islands_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1RAhjcT0uP6HKy5VFlRuSQsXa1Ct6oK2S/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Science_in_the_Kitchen_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1tDo2A7YHpVy-viFMvmCBCgf2UYT_BTS5/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Chambers's_Twentieth_Century_Dictionary_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1YGkClfXCJlaRu4wEqPNNtvitYU9Da4BM/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Ancient_Britain_and_the_Invasions_of_Julius_Caesar_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1RMRv7PLnWVMVyq_iRr6qhYs79sY6_N1d/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,The_Works_of_William_Shakespeare_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1iCKQ2xcPlhHMnkTfOfekiTAL5Iy95mqL/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Anne_of_Green_Gables_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ZRJgdpRI55Ej51TApcTM-58hup4PpRte/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,The_Legend_of_Sleepy_Hollow_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/15PL-71Z8Own921E3G7sRuXruTARzY_m7/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Concrete_Construction_Methods_and_Costs_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1s8Lx7Sv8C29GyvMW7WwasiNfAWgSdzHh/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Concrete_Construction_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1m3bTEPoeDkLmRifCuce_hfbN1pW2aGZl/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Little_Women_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ZwNHoxea0xqyugUsTlUmdo6lddx3guYc/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Pride_and_Prejudice_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/14TNc27pwCQYU3BzO7AeAo6KOXppXky3tYXMFxSmBNbA/edit?usp=drivesdk
หนังสือทั่วไป,Leviathan_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1nvyjQ5g9lkdGA7e7egQPqOxF-gj5dTZA/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Adventures_of_Huckleberry_Finn_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1zKF2_5O_2PPPGQ8clVO7TnmhhRrAWfJ_Mn5DiELVeuQ/edit?usp=drivesdk
หนังสือทั่วไป,Ulysses_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1w56yY-SkgG4V5PVbLN3rSRd82Q7E0-00/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,วอลเปเปอร์สีเหลือง_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/19Xi4p0tp_84XgvLRsq1Xv1j23WZaLyDz/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,พ่อมดมหัศจรรย์แห่งเมืองออซ_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/18puAtyhBRKoeRjjUzZ5kRBVeW5Pp7URT/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,The_Mysteries_of_Udolpho_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1Du0zMQQQrN3ECYxTGMzbwWgKaH6UD7eL/edit?usp=drivesdk&ouid=116788851844934495146&rtpof=true&sd=true
หนังสือทั่วไป,Working North from Patagonia: ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1bs8tfUJOrt9RrZ-cpvjryyzhNeHKJmMcYIwmTZYR7CM/edit?usp=drivesdk
หนังสือทั่วไป,สารานุกรมชีวประวัติบุคคลสำคัญแห่งแคนาดา_ฉบับภาษาไทย,,https://docs.google.com/document/d/1xDMuEz5fUnhONyW5dVcPBVDdvG8iOM4KuNEXJqVCElY/edit?usp=drivesdk
หนังสือทั่วไป,A_Cyclopaedia_of_Canadian_Biography_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1xJcM4KqEqtL-7pKZKnIGZcxjZddlPwVPHb49nASnuQg/edit?usp=drivesdk
หนังสือทั่วไป,A_Guide_Book_of_Art_Architecture_and_Historic_Interests_in_Pennsylvania_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1A0otCPqYmzzrALH1g2VGUeb6j0dOxvDHkyklg5oZpO4/edit?usp=drivesdk
หนังสือทั่วไป,A_Pickle_for_the_Knowing_Ones_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1roqbFtGSa6vMC-f-nbh9sboHd0N_TYHE3p8hjBcESeM/edit?usp=drivesdk
หนังสือทั่วไป,Daily_Stories_of_Pennsylvania_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1U91O0KWbWNDH_P1FWBNRtjuOSHhIIaz3RDmXBhHMCx4/edit?usp=drivesdk
หนังสือทั่วไป,Fifty_Years_in_the_Northwest_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1_TU8HhIAssn9AhZfSb4r1suXUnRV3E-GpJO6vJk5Qkg/edit?usp=drivesdk
หนังสือทั่วไป,Historic_Jamaica_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1p0KieStqjERvP3KhfEDfI8q2zES69YPDYeLrLk_goSU/edit?usp=drivesdk
หนังสือทั่วไป,History_of_Atchison_County_Kansas_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1799sgh1ybBUlEFW1-UUQKCtmVjG6Kob-HMTEtLUWsOM/edit?usp=drivesdk
หนังสือทั่วไป,History_of_Central_America_Vol_2_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/18EpZkCN7Tq37tE2tiAaBdb4AIOqtPf-BLPnysKzOL00/edit?usp=drivesdk
หนังสือทั่วไป,History_of_Linn_County_Iowa_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1vz9ZBUdGsqpsITXlT1qUqhYLKqNXBVRajLzCd-_DWWk/edit?usp=drivesdk
หนังสือทั่วไป,History_of_Mexico_Vol_1_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1XvQZ8pf1Cl5sI6oCx2tYKI-CkXfEvHVmNBEjrZl0bJY/edit?usp=drivesdk
หนังสือทั่วไป,The_History_of_Orange_County_New_York_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/17iKmpdwoBPXdOviVT0N5e5po-1r8zq40_yYBYy1-ndI/edit?usp=drivesdk
หนังสือทั่วไป,The_Journals_of_Lewis_and_Clark_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1io6o5FvJ2eT4upadozK3_5BksEq-y_dBpuYQM2LjEjU/edit?usp=drivesdk
หนังสือทั่วไป,The_Memoirs_of_the_Conquistador_Bernal_Diaz_del_Castillo_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1c07xa_5-VRwnv2SYH9q7MOAzbcRE7LiCw3KnjvKPjjo/edit?usp=drivesdk
หนังสือทั่วไป,The_San_Francisco_Calamity_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1tjuZPCuDaJ6wYIJEM2Qbhv3dHw8MKkzWdwTOIr671_Q/edit?usp=drivesdk
หนังสือทั่วไป,Washington_Confidential_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/17MWaZHjti-k7bCv_CF8sMbuGqUh_Aetu51CeHlOaQpw/edit?usp=drivesdk
หนังสือทั่วไป,The_Wisconsin_Magazine_of_History_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1CDNboplpOqatykh5PjLMMcx4cWajKjYbe6ovZ-BkXn0/edit?usp=drivesdk`,

  sheet3: `category,title,description,url
หนังสือทั่วไป,The_Natural_History_of_Pliny_Volume_I_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1S4VMXMZEoPLFQQHDEqsOm10twSZGTb9i/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,"Plant Lore, Legends, and Lyrics_ฉบับภาษาไทย.docx",,https://docs.google.com/document/d/1htXkKk39tVOM1rWWQiLkCyh7SP4H4_6i/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Origin_of_Species_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1IrNmujuLjlW4kPMOblCTSGFsWtdS_tXq/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_First_Six_Books_of_the_Elements_of_Euclid_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1mnJb6sFP0m3tt8klV5lkBq-9llL9ZttB/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,History_of_Botany_(1530-1860)_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/10lxPalazB9A38gXZmLVzakAm4U6fDTlL/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,More_Letters_of_Charles_Darwin_Volume_1_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1UjQWFclq9OKdHo3BYlyvys9-TVQLJTpZ/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Sterminator_Vesevo_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/17mR2eZNPFFDtbAi9GGsQN92F-vqa5vTy/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Iron_Heel_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ztYWoy3QtU6IqRSypxzZCIkfw35kseVd/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Commentaries_on_the_Laws_of_England_Book_1_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1C5p-fNWeS1bsHf73cNgm45A4zdCt4cLo/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Complete_Works_of_John_Gower_Vol_3_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1nO_5s_iRTZUpr4A_X1WzJS-uHGPJ9DKD/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Roman_Stoicism_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1Znbx8eMB-XO_JxLC3fRahLv7o7lUZQ9O/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,A_Modest_Proposal_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1T__NPBGX8L8YOqJhj2BU-f7Cnf0WQAF6/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Adventures_of_Huckleberry_Finn_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1tF6Tt7v7Feqw0MqiCP1zh9zYK85a99KK/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Beowulf_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1660GzVld_QhfhDJEwulXV31FS0KXtwwS/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Second_Treatise_of_Government_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1tlgv4Xa1jyjXLmsmZAQqjHZZGMvAH2I5/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Count_of_Monte_Cristo_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1hj3qmKckaFWbC2tJUN-m6w_MurjsAHYe/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_History_of_Human_Marriage_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1SZvvsLgT3gyM0R0SA5BsWUGM817g4Rlk/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Importance_of_Being_Earnest_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1Ys8cqlBOSIMQRTLcxi-F1HqCGXxF6z_G/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Mysteries_of_Udolpho_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1A9Vj_JOhqm6LOqKgbAy8whslxpDZffd2/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Natural_History_of_Pliny_Volume_V_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/11kEday8E6P--zIcJdjKYGHhoV6TpecKz/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Origin_and_Development_of_the_Moral_Ideas_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1odM8ZUaXebRvRcFScJ-31f0MTFBNK4v_/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Works_of_Edgar_Allan_Poe_Volume_2_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1twcTXU_wn7UqmSy3ohQQSmw-oXFgbWts/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Works_of_William_Shakespeare_Vol_3_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1Uf37Pac5asBOuVwEKCodp-KwSdTxVHfw/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Putnam's_Word_Book_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1gSsoNtdobD1uTUmxkotlPwbqaPL9HJ6a/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Journals_of_Lewis_and_Clark_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1sW48ISdzob6gSA1mzjtUJrfr4MzAnC4U/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Natural_History_of_Pliny_Volume_VI_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1ugqjCHdahRIL6-B0mmUlPD1IGQMU7aup/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,A_Doll's_House_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1r32uEDX7j875RRlHZUVwgZaWUeWvbj8m/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,A_Christmas_Carol_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1EiRwVlmuPn3_JFakO-LPnRvJG6nqNLqe/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Walden_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1r9gbOHIzq9_9kA80YsydPkFl9mpibPGp/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Adventures_of_Tom_Sawyer_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/19kKsxfYd_Mp69nv2W_X01QqqOMN3_aey/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Treasure_Island_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1mRgkS38jGlvtp0xmeURxxIsYzTVnjRk_CSPMJLVBZMg/edit?usp=drivesdk
หนังสือทั่วไป,The_Great_Gatsby_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1M54VyDYrFqchhuU6iyhZ_f2wQY_0F70b/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Beowulf_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/14fmHMGPmUHN8KV91p0unCBKJWl4sYN2F/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,A_Study_in_Scarlet_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/13TXNJhsGfC_GAwvbYvfNbWcOGUtJ1cCh/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Confessions_of_St_Augustine_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1IsRXburtx4RwDF_ecYL6n_VSvzWJ3eI1/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Secret_of_Chimneys_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1MR_WDZjN-pT5-5Aqk8Avy9lchqK7KaBH/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,Lyman's_History_of_Old_Walla_Walla_County_Vol_2_ฉบับภาษาไทย,,https://docs.google.com/document/d/1ATF448VEx80kL4_UIqDAqfp9ykbGsSCpP3km0X_33t0/edit?usp=drivesdk
หนังสือทั่วไป,Montreal_from_1535_to_1914_Vol_3_Biographical_ฉบับภาษาไทย.txt,,https://docs.google.com/document/d/1xMLl3zpzleARAm6riKn4-hN5sWeZ13V5Qql9CxG_uh8/edit?usp=drivesdk
หนังสือทั่วไป,The_Adventures_of_Roderick_Random_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/13dF27Ra5Xy-M_3czxJAVMkF_3d600VMa/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_History_of_Tom_Jones_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1Xhl62Nd9HNihqcK2OwHUOSaqTIcqIS5Z/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,The_Metamorphosis_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1fDd4v1vh2hIYnl0VKuCnTKRBr0w56FoF/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true
หนังสือทั่วไป,War_and_Peace_ฉบับภาษาไทย.docx,,https://docs.google.com/document/d/1SQeoRTmPyVI9VlJdoPTWPLZqklaHRZrL/edit?usp=drivesdk&ouid=112901445251662917486&rtpof=true&sd=true`
};

// Palettes and Book Covers for Sheet Docs
const BOOK_COVER_IMAGES: { [key: string]: string } = {
  flatland: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop',
  cambridge: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop',
  lamarck: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop',
  farting: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  pliny: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop',
  'plant lore': 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop',
  'origin of species': 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop',
  euclid: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop',
  botany: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop',
  darwin: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop',
  vesevo: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=400&auto=format&fit=crop',
  'iron heel': 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=400&auto=format&fit=crop',
  commentaries: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  gower: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop',
  stoicism: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&auto=format&fit=crop',
  'modest proposal': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  marriage: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop',
  earnest: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  moral: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&auto=format&fit=crop',
  poe: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=400&auto=format&fit=crop',
  putnam: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  doll: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  christmas: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
  walden: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  treasure: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  government: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  'tom sawyer': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
  'great gatsby': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  gatsby: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  beowulf: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop',
  scarlet: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
  augustine: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  chimneys: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=400&auto=format&fit=crop',
  walla: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop',
  montreal: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop',
  random: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  'tom jones': 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
  metamorphosis: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  'war and peace': 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop',
  huckleberry: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  ulysses: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400&auto=format&fit=crop',
  pride: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  expectations: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
  concrete: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=400&auto=format&fit=crop',
  วอลเปเปอร์: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=400&auto=format&fit=crop',
  ออซ: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=400&auto=format&fit=crop',
  udolpho: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=400&auto=format&fit=crop',
  patagonia: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  แคนาดา: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop',
  pennsylvania: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop',
  pickle: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  jamaica: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  kansas: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop',
  central: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  mexico: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  lewis: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  wuthering: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400&auto=format&fit=crop',
  cranford: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  view: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  alice: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=400&auto=format&fit=crop',
  cities: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=400&auto=format&fit=crop',
  crime: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  frankenstein: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=400&auto=format&fit=crop',
  dracula: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop',
  eyre: 'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?q=80&w=400&auto=format&fit=crop',
  women: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  meditations: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&auto=format&fit=crop',
  middlemarch: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  moby: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&auto=format&fit=crop',
  life: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  romeo: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop',
  sherlock: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
  castle: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=400&auto=format&fit=crop',
  karamazov: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  shakespeare: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=400&auto=format&fit=crop',
  monte: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  enchanted: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  yellow: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop',
  odyssey: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=400&auto=format&fit=crop',
  dorian: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop',
  jekyll: 'https://images.unsplash.com/photo-1509021436665-8f07dbf5bf1d?q=80&w=400&auto=format&fit=crop',
  twenty: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  magic: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=400&auto=format&fit=crop',
  mathematics: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop',
  amusements: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?q=80&w=400&auto=format&fit=crop',
  audubon: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop',
  insects: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop',
  melancholy: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&auto=format&fit=crop',
  jesus: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  zarathustra: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&auto=format&fit=crop',
  baskervilles: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=400&auto=format&fit=crop',
  surgery: 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=400&auto=format&fit=crop',
  pharmacographia: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop',
  joan: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop',
  flapper: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=400&auto=format&fit=crop',
  homer: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=400&auto=format&fit=crop',
  kitchen: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  dictionary: 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=400&auto=format&fit=crop',
  universe: 'https://images.unsplash.com/photo-1506466010722-395aa2bef877?q=80&w=400&auto=format&fit=crop',
  lichens: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=400&auto=format&fit=crop',
  colours: 'https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?q=80&w=400&auto=format&fit=crop',
  fathom: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  clinker: 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?q=80&w=400&auto=format&fit=crop',
  flesh: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop',
  grimms: 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?q=80&w=400&auto=format&fit=crop'
};

function getBookImage(title: string, rawTitle: string, docId: string): string {
  const t = (title + ' ' + rawTitle).toLowerCase();
  for (const [key, img] of Object.entries(BOOK_COVER_IMAGES)) {
    if (t.includes(key)) return img;
  }
  if (docId) {
    return `https://drive.google.com/thumbnail?id=${docId}&sz=w400`;
  }
  return 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop';
}

/**
 * Transforms Google Docs URL into clean /preview view
 */
export function getGoogleDocsPreviewUrl(url: string): string {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://docs.google.com/document/d/${match[1]}/preview`;
  }
  return url;
}

export function getGoogleDocsId(url: string): string {
  if (!url) return '';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
  return match && match[1] ? match[1] : '';
}

/**
 * RFC-compliant CSV line parser that properly preserves commas inside quotation marks
 */
export function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

/**
 * Parses raw title to clean title, format, and author/sub info
 */
function cleanBookTitle(raw: string): { title: string; fileType: 'docx' | 'txt' | 'doc'; category: string } {
  let cleaned = raw.trim();
  let fileType: 'docx' | 'txt' | 'doc' = 'docx';

  if (cleaned.endsWith('.docx')) {
    fileType = 'docx';
    cleaned = cleaned.replace('.docx', '');
  } else if (cleaned.endsWith('.txt')) {
    fileType = 'txt';
    cleaned = cleaned.replace('.txt', '');
  } else if (cleaned.endsWith('.doc')) {
    fileType = 'doc';
    cleaned = cleaned.replace('.doc', '');
  }

  // Remove common suffixes
  cleaned = cleaned.replace(/_ฉบับภาษาไทย/g, '');
  cleaned = cleaned.replace(/_ฉบับภาษาไทย$/g, '');
  cleaned = cleaned.replace(/ฉบับภาษาไทย/g, '');
  cleaned = cleaned.replace(/_/g, ' ');

  // Auto-categorize based on title
  let category = 'วรรณกรรมคลาสสิก';
  const lower = cleaned.toLowerCase();
  if (lower.includes('history') || lower.includes('memoir') || lower.includes('journal') || lower.includes('ชีวประวัติ') || lower.includes('สารานุกรม') || lower.includes('calamity')) {
    category = 'ประวัติศาสตร์ / ชีวประวัติ';
  } else if (lower.includes('sherlock') || lower.includes('scarlet') || lower.includes('chimneys') || lower.includes('mysteries') || lower.includes('jekyll') || lower.includes('baskervilles')) {
    category = 'สืบสวนสอบสวน / ลึกลับ';
  } else if (lower.includes('dracula') || lower.includes('frankenstein') || lower.includes('yellow') || lower.includes('วอลเปเปอร์')) {
    category = 'สยองขวัญ / โกธิค';
  } else if (lower.includes('adventure') || lower.includes('odyssey') || lower.includes('huckleberry') || lower.includes('tom sawyer') || lower.includes('beowulf') || lower.includes('oz') || lower.includes('alice') || lower.includes('ออซ')) {
    category = 'ผจญภัย / แฟนตาซี';
  } else if (lower.includes('romeo') || lower.includes('pride') || lower.includes('wuthering') || lower.includes('jane eyre') || lower.includes('gatsby')) {
    category = 'โรแมนติกคลาสสิก';
  } else if (lower.includes('concrete') || lower.includes('guide') || lower.includes('confidential') || lower.includes('science') || lower.includes('mathematics') || lower.includes('surgery') || lower.includes('pharmacographia')) {
    category = 'วิทยาศาสตร์ / สารคดี';
  }

  return { title: cleaned.trim(), fileType, category };
}

export function parseCSVToBooks(csv: string, sheetNum: 1 | 2 | 3): ThaiDocBook[] {
  if (!csv || !csv.trim()) return [];
  const lines = csv.split(/\r?\n/);
  if (lines.length < 1) return [];
  
  const books: ThaiDocBook[] = [];

  // Detect if line 0 is a header (does not contain http link)
  const firstLineHasUrl = lines[0] && (lines[0].includes('http://') || lines[0].includes('https://'));
  const startIndex = firstLineHasUrl ? 0 : 1;

  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Split using CSV quote-aware parser
    const parts = parseCsvLine(line);
    if (parts.length < 2) continue;

    // Find which column index contains the Google Doc / web URL
    let urlIndex = parts.findIndex(p => {
      const clean = p.replace(/^["']|["']$/g, '').trim();
      return clean.startsWith('http://') || clean.startsWith('https://');
    });

    if (urlIndex === -1) continue; // not a book row

    const url = parts[urlIndex].replace(/^["']|["']$/g, '').trim();

    let rawCategory = 'หนังสือทั่วไป';
    let rawTitle = 'ไม่มีชื่อ';

    if (urlIndex === 1) {
      // 2 columns: [title, url]
      rawTitle = parts[0]?.replace(/^["']|["']$/g, '').trim() || 'ไม่มีชื่อ';
    } else if (urlIndex === 2) {
      // 3 columns: [category, title, url]
      rawCategory = parts[0]?.replace(/^["']|["']$/g, '').trim() || 'หนังสือทั่วไป';
      rawTitle = parts[1]?.replace(/^["']|["']$/g, '').trim() || parts[0]?.trim() || 'ไม่มีชื่อ';
    } else {
      // 4+ columns: [category, title, description, url, ...]
      rawCategory = parts[0]?.replace(/^["']|["']$/g, '').trim() || 'หนังสือทั่วไป';
      rawTitle = parts[1]?.replace(/^["']|["']$/g, '').trim() || 'ไม่มีชื่อ';
    }

    // Fallback if title is empty
    if (!rawTitle || rawTitle === 'ไม่มีชื่อ') {
      for (let c = 0; c < urlIndex; c++) {
        const val = parts[c]?.replace(/^["']|["']$/g, '').trim();
        if (val && val !== 'หนังสือทั่วไป') {
          rawTitle = val;
          break;
        }
      }
    }

    const { title, fileType, category } = cleanBookTitle(rawTitle);
    const previewUrl = getGoogleDocsPreviewUrl(url);
    const docId = getGoogleDocsId(url);
    const fallbackImage = getBookImage(title, rawTitle, docId);
    // Directly use Google Drive Thumbnail URL as specified: lh3.googleusercontent.com/d/{docId}
    const fileThumbnail = docId
      ? `https://lh3.googleusercontent.com/d/${docId}`
      : fallbackImage;

    books.push({
      id: `doc-${sheetNum}-${i}-${docId || i}`,
      category: rawCategory !== 'หนังสือทั่วไป' ? rawCategory : category,
      title: title || rawTitle,
      rawTitle,
      url,
      previewUrl,
      docId,
      sheetSource: sheetNum,
      fileType,
      image: fileThumbnail,
      fallbackImage,
      description: `วรรณกรรมฉบับแปลไทย พร้อมเปิดอ่านทันทีผ่าน Google Docs Viewer (ชุดที่ ${sheetNum})`
    });
  }

  return books;
}

// Pre-parsed collection of all books combined from Sheets 1, 2, and 3 (deduplicated)
export const ALL_DOC_BOOKS: ThaiDocBook[] = (() => {
  const all = [
    ...parseCSVToBooks(RAW_SHEETS_CSV.sheet1, 1),
    ...parseCSVToBooks(RAW_SHEETS_CSV.sheet2, 2),
    ...parseCSVToBooks(RAW_SHEETS_CSV.sheet3, 3)
  ];
  const seen = new Set<string>();
  const unique: ThaiDocBook[] = [];
  for (const b of all) {
    const key = b.docId || b.url || b.title;
    if (!seen.has(key)) {
      seen.add(key);
      unique.push(b);
    }
  }
  return unique;
})();

import { ENGLISH_BOOKS } from './englishBooksData';

// Return English books sourced directly from the Gutenberg sheet
export function getEnglishBooksFromSheets(): import('../types').EnglishBook[] {
  return ENGLISH_BOOKS;
}
